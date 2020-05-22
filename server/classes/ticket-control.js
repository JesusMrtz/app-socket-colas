const fs = require('fs');

class Ticket {
    constructor(numberTicket, desk) {
        this.numberTicket = numberTicket;
        this.desk = desk;
    }
}


class TicketControl {
    constructor() {
        this.lastTicket = 0;
        this.today = new Date().getDate();
        this.tickets = [];
        this.lastFourTickets = [];
        let data = require('../data/data.json');

        if (data.today === this.today) {
            this.lastTicket = data.lastTicket;
            this.tickets = data.tickets;
            this.lastFourTickets = data.lastFourTickets;
        } else {
            this.resetCountTickets();
        }
    }

    resetCountTickets() {
        this.lastTicket = 0;
        this.tickets = [];
        this.lastFourTickets = [];
        this.saveFile();
    }

    nextTicket() {
        this.lastTicket += 1;
        let ticket = new Ticket(this.lastTicket, null);
        this.tickets.push(ticket);
        this.saveFile();

        return `Ticket ${this.lastTicket}`;
    }

    attendTicket(desk) {
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        let numberTicket = this.tickets[0].numberTicket;
        this.tickets.shift();

        let attendTicket = new Ticket(numberTicket, desk);

        this.lastFourTickets.unshift(attendTicket);

        if (this.lastFourTickets.length > 4) {
            this.lastFourTickets.splice(-1, 1);
        }

        console.log('Ultimos 4: ', this.lastFourTickets);

        this.saveFile();
        return attendTicket;
    }

    getStatusTicket() {
        return `Ticket ${this.lastTicket}`;
    }

    getLastFourTickets() {
        return this.lastFourTickets;
    }

    saveFile() {
        let jsonData = {
            lastTicket: this.lastTicket,
            today: this.today,
            tickets: this.tickets,
            lastFourTickets: this.lastFourTickets
        };

        fs.writeFileSync('./server/data/data.json', JSON.stringify(jsonData));
    }
}


module.exports = {
    TicketControl
};