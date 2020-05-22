var socket = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var arrayTickets = [
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
var arrayDesks = [
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];

socket.on('actualState', function(data) {
    console.log(data);
    updateHTML(data.lastFourTickets);
});

socket.on('lastFourTickets', function(data) {
    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    console.log('Aqui esta el audio');
    console.log(audio);
    updateHTML(data.lastFourTickets);
});

function updateHTML(lastFourTickets) {
    for (var i = 0; i < lastFourTickets.length; i++) {
        arrayTickets[i].text('Ticket ' + lastFourTickets[i].numberTicket);
        arrayDesks[i].text('Escritorio ' + lastFourTickets[i].desk);
    }
}