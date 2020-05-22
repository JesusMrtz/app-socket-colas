// Comando para establecer la conexión
var socket = io();
var labelSmall = $('small');

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var desk = searchParams.get('escritorio');

$('h1').text(`Escritorio ${desk}`);

$('button').on('click', function() {
    socket.emit('attendTicket', {
        desk,

    }, function(response) {
        console.log(response);

        if (response === 'No hay tickets') {
            labelSmall.text(response);
            alert(response);
            return;
        }
        labelSmall.text('Ticket ' + response.numberTicket);
    });
});