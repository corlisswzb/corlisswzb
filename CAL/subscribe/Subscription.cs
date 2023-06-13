using System;

namespace CAL.subscribe
{
    //enum 枚举类型
    public enum SubscriptionType
    {
        Monthly, //月费
        Yearly, //年费
    }

    public class Subscription
    {
        public int UserId { get;set; }
        public SubscriptionType SubscriptionType { get;set; }
        public DateTime StartDate { get;set; }
        public DateTime EndDate { get;set; }
        public bool IsActive { get;set; }
    }
}
