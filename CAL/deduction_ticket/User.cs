using System.Collections.Generic;
using Jbfd.Models.deduction_ticket;

namespace CAL.deduction_ticket
{
    public class User
    {
        public string Email { get;set; }
        //用于表示用户的相关信息，包括已购买的票以及余额等属性
        public decimal Balance { get; set; }
        public List<TicketModel> PurchasedTickets { get; set; }

        public User() 
        { 
            PurchasedTickets = new List<TicketModel>();
        }
    }
}
