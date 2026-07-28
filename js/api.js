// Módulo API: Se encarga de la comunicación con el servidor y la obtención de datos

export async function obtenerUsuarios() {
    const URL = 'https://jsonplaceholder.typicode.com/users';
    
    try {
        // Petición asíncrona con fetch usando la variable correcta
        const respuesta = await fetch(URL);

        if (!respuesta.ok) {
            throw new Error(`Error en la conexión con la API: ${respuesta.status}`);
        }
        
        const datos = await respuesta.json();
        return datos;

    } catch (error) {
        console.error('Fallo en la petición a la API:', error);
        return []; // Retorna un array vacío para evitar que la app se rompa al leer los datos
    }
}

        

