using CAL.deduction_ticket;
using System;
using Jbfd.Models.deduction_ticket;

namespace BLL.deduction_ticket
{
    //处理扣费的操作
    public class BillingServiceBusiness
    {
        //创建票证
        public void CreateTicket(User user,decimal ticketPrice)
        {
            if(user.Balance > 0)
            {
                TicketModel ticket = new TicketModel()
                {
                    TicketId = GenerateTicketId(),
                    Price = ticketPrice,
                    IsPaid = false
                };
                user.PurchasedTickets.Add(ticket);
                Console.WriteLine("票证创建成功。");
            }
            else
            {
                //余额不足。票证创建失败。
                Console.WriteLine("余额不足。票证创建失败。");
                SendEmailToUser(user);
            }
        }

        //扣除费用
        public void DeductFees(User user, TicketModel ticket)
        {
            //检查是否有足够支付票的价格
            if (user.Balance >= ticket.Price)
            {
                //余额充足
                user.Balance -= ticket.Price;
                ticket.IsPaid = true;
                //付款成功,已购票
                Console.WriteLine("Payment successful. Ticket purchased.");
            }
            else
            {
                //余额不足需支付费用 余额不足。付款失败
                Console.WriteLine("Insufficient balance. Payment failed.");
                SendEmailToUser(user);
            }
        }

        private int GenerateTicketId()
        {
            //生成唯一的票号
            return new Random().Next(1000,9999);
        }

        //发送邮件给用户
        private void SendEmailToUser(User user)
        {
            // 发送邮件给用户，提醒续费
            Console.WriteLine("Sending email to user: " + user.Email + " - Please renew your subscription.");
        }

        //调用的主程序
        public static void Main()
        {
            User user = new User();

            user.Email = "1401065007@qq.com";
            user.Balance = 0;

            BillingServiceBusiness billingService = new BillingServiceBusiness();

            user.Balance = 100.0m; //用户初始余额为100

            TicketModel ticket = new TicketModel();
            ticket.TicketId = 1;
            ticket.Price = 50.0m; //票的价格为50

            decimal ticketPrice = 50.0m;

            billingService.CreateTicket(user, ticketPrice);

            //扣费
            if (user.PurchasedTickets.Count>0)
            {
                //支付成功,已购票
                Console.WriteLine("Payment successful. Ticket purchased.");
                Console.WriteLine("Remaining balance: " + user.Balance); //余额
                Console.WriteLine("Purchased tickets: " + user.PurchasedTickets.Count); //已购票
            }
            else
            {
                //余额不足。付款失败
                Console.WriteLine("Insufficient balance. Payment failed.");
            }
        }

    }
}
