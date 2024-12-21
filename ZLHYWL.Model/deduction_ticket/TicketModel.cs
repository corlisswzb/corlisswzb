using SqlSugar;

namespace Jbfd.Models.deduction_ticket
{
    //票
    public class TicketModel
    {
        public int TicketId { get; set; }
        public decimal Price { get; set; }
        public bool IsPaid { get;set; }
    }
}
