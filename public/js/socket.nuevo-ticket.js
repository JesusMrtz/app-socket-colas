// Comando para establecer la conexión
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('Desconectado al servidor');
});

// Obtener el event del servidor
socket.on('actualState', function(response) {
    label.text(response.actualState);
});

$('#btn-generar-ticket').on('click', function() {
    socket.emit('nextTicket', null, function(nextTicket) {
        label.text(nextTicket);
        console.log(nextTicket);
        console.log(label);
    });
});