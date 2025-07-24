import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Volunteer } from '@/models';
import { verifyDecisionToken } from '@/lib/email';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const tempId = searchParams.get('tempId');
    const action = searchParams.get('action');
    const token = searchParams.get('token');
    const dataEncoded = searchParams.get('data');

    // Validation des paramètres
    if (!tempId || !action || !token) {
      return new NextResponse(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erreur - Paramètres manquants</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 50px; text-align: center; }
            .error { color: #ef4444; }
          </style>
        </head>
        <body>
          <h1 class="error">❤️ Erreur</h1>
          <p>Paramètres manquants ou invalides.</p>
        </body>
        </html>
      `, {
        status: 400,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Vérifier le token
    if (!verifyDecisionToken(tempId, action, token)) {
      return new NextResponse(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Erreur - Token invalide</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 50px; text-align: center; }
            .error { color: #ef4444; }
          </style>
        </head>
        <body>
          <h1 class="error">❤️ Erreur</h1>
          <p>Lien invalide ou expiré.</p>
        </body>
        </html>
      `, {
        status: 401,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Si action = 'reject', afficher simplement la confirmation de refus
    if (action === 'reject') {
      return new NextResponse(`
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Candidature refusée</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 50px; 
              text-align: center;
              background-color: #f9fafb;
            }
            .card {
              background: white;
              padding: 40px;
              border-radius: 10px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              max-width: 500px;
              margin: 0 auto;
            }
            .rejected { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1 class="rejected">❌ Candidature refusée</h1>
            <p>La candidature de bénévolat a été refusée.</p>
            <p><em>Aucun enregistrement n'a été créé en base de données.</em></p>
            <p><em>Décision prise le ${new Date().toLocaleString('fr-FR')}</em></p>
          </div>
        </body>
        </html>
      `, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
      });
    }

    // Si action = 'accept', décoder les données et créer le bénévole
    if (action === 'accept') {
      if (!dataEncoded) {
        return new NextResponse(`
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erreur - Données manquantes</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 50px; text-align: center; }
              .error { color: #ef4444; }
            </style>
          </head>
          <body>
            <h1 class="error">❤️ Erreur</h1>
            <p>Données du candidat manquantes.</p>
          </body>
          </html>
        `, {
          status: 400,
          headers: { 'Content-Type': 'text/html' },
        });
      }

      try {
        // Décoder les données du candidat
        const candidateData = JSON.parse(Buffer.from(dataEncoded, 'base64url').toString());
        
        // Vérifier si un bénévole avec cet email existe déjà
        const existingVolunteer = await Volunteer.findOne({ email: candidateData.email });
        if (existingVolunteer) {
          return new NextResponse(`
            <!DOCTYPE html>
            <html lang="fr">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Déjà enregistré</title>
              <style>
                body { 
                  font-family: Arial, sans-serif; 
                  margin: 50px; 
                  text-align: center;
                  background-color: #f9fafb;
                }
                .card {
                  background: white;
                  padding: 40px;
                  border-radius: 10px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                  max-width: 500px;
                  margin: 0 auto;
                }
                .info { color: #3b82f6; }
              </style>
            </head>
            <body>
              <div class="card">
                <h1 class="info">ℹ️ Déjà traité</h1>
                <p>Ce bénévole est déjà enregistré dans la base de données.</p>
                <p><strong>Statut actuel:</strong> ${existingVolunteer.status === 'approved' ? 'Accepté' : 'En attente'}</p>
              </div>
            </body>
            </html>
          `, {
            status: 200,
            headers: { 'Content-Type': 'text/html' },
          });
        }

        // Créer le nouveau bénévole avec le statut 'approved'
        const newVolunteer = new Volunteer({
          firstName: candidateData.firstName,
          lastName: candidateData.lastName,
          email: candidateData.email,
          function: candidateData.function,
          motivation: candidateData.motivation,
          status: 'approved', // Directement approuvé
        });

        await newVolunteer.save();

        // Afficher la page de confirmation
        return new NextResponse(`
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Bénévole accepté</title>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                margin: 50px; 
                text-align: center;
                background-color: #f9fafb;
              }
              .success { color: #22c55e; }
              .card {
                background: white;
                padding: 40px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 500px;
                margin: 0 auto;
              }
              .candidate-info {
                background: #f3f4f6;
                padding: 20px;
                border-radius: 6px;
                margin: 20px 0;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <div class="card">
              <h1 class="success">✅ Bénévole accepté et enregistré!</h1>
              <p>La candidature a été <strong>acceptée</strong> et le bénévole a été ajouté à la base de données.</p>
              
              <div class="candidate-info">
                <p><strong>Nom:</strong> ${candidateData.firstName} ${candidateData.lastName}</p>
                <p><strong>Email:</strong> ${candidateData.email}</p>
                <p><strong>Fonction:</strong> ${candidateData.function}</p>
                <p><strong>Statut:</strong> <span style="color: #22c55e;">Approuvé</span></p>
              </div>
              
              <p><em>Enregistré le ${new Date().toLocaleString('fr-FR')}</em></p>
              <p style="color: #22c55e;">💬 N'oubliez pas de contacter le nouveau bénévole pour les prochaines étapes!</p>
            </div>
          </body>
          </html>
        `, {
          status: 200,
          headers: { 'Content-Type': 'text/html' },
        });

      } catch (decodeError) {
        console.error('Erreur décodage données candidat:', decodeError);
        return new NextResponse(`
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Erreur - Données corrompues</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 50px; text-align: center; }
              .error { color: #ef4444; }
            </style>
          </head>
          <body>
            <h1 class="error">❤️ Erreur</h1>
            <p>Données du candidat corrompues ou invalides.</p>
          </body>
          </html>
        `, {
          status: 400,
          headers: { 'Content-Type': 'text/html' },
        });
      }
    }

  } catch (error) {
    console.error('Erreur lors de la décision bénévole:', error);
    return new NextResponse(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Erreur serveur</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 50px; text-align: center; }
          .error { color: #ef4444; }
        </style>
      </head>
      <body>
        <h1 class="error">❤️ Erreur serveur</h1>
        <p>Une erreur s'est produite lors du traitement de votre demande.</p>
      </body>
      </html>
    `, {
      status: 500,
      headers: { 'Content-Type': 'text/html' },
    });
  }
}
