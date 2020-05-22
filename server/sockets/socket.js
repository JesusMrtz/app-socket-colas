const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        usuario: 'Administrador',
        mensaje: 'Bienvenido a esta aplicación'
    });



    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('nextTicket', (data, callback) => {
        let nextTicket = ticketControl.nextTicket();

        console.log(nextTicket);
        callback(nextTicket);
    });

    // Emitir un event
    client.emit('actualState', {
        actualTicket: ticketControl.getStatusTicket(),
        lastFourTickets: ticketControl.getLastFourTickets()
    });

    client.on('attendTicket', (data, callback) => {
        if (!data.desk) {
            return callback({
                error: true,
                message: 'El escritorio es necesario'
            });
        }

        let attendTicket = ticketControl.attendTicket(data.desk);
        callback(attendTicket);

        // Actualizar / Notificar cambios en los últimos 4 tickets
        client.broadcast.emit('lastFourTickets', {
            lastFourTickets: ticketControl.getLastFourTickets()
        });
    });

});