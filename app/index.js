import app from './app.js';
import { dbConnect } from './config/db.js';
const port = Number(process.env.PORT) || 5000;

async function main() {

  try {

    await dbConnect();


    app.get('/home', (req, res) => res.send('Hola Mundo desde send'));
    
    app.listen(port, () => {

      console.log("Servidor corriendo en el puerto: " + port);
    });


  } catch (error) {

    console.error(
      "No se pudo iniciar el backend. Configura MONGODB_URI en backend/.env y vuelve a ejecutar npm run dev.",
      error
    );
    process.exitCode = 1;

  }

};

main();