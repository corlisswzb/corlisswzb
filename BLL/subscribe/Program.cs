using CAL.subscribe;

namespace BLL.subscribe
{
    //程序调用
    public class Program
    {
        public static void Main()
        {
            //创建发布者和订阅者实例
            PublisherBusiness publisher = new PublisherBusiness();
            //创建订阅管理器
            SubscriberManagerBusiness subscriber1 = new SubscriberManagerBusiness();
            //模拟用户订阅
            subscriber1.SubscribeUser(123, SubscriptionType.Monthly);
            //检查订阅状态
            subscriber1.CheckSubscriptionStatus(123);
            //续订订阅
            subscriber1.RenewSubscription(123);

            SubscriberManagerBusiness subscriber2 = new SubscriberManagerBusiness();
            //模拟用户订阅
            subscriber2.SubscribeUser(123, SubscriptionType.Monthly);
            //检查订阅状态
            subscriber2.CheckSubscriptionStatus(123);
            //续订订阅
            subscriber2.RenewSubscription(123);

            //用户付费后启用订阅模式
            publisher.EnableSubscription();

            //订阅事件
            publisher.EventOccurred += subscriber1.HandleEvent;
            publisher.EventOccurred += subscriber2.HandleEvent;

            //发布者执行操作，触发事件
            publisher.DoSumething();

            //用户取消订阅后禁用订阅模式
            publisher.DisableSubscription();

            //再次执行操作，不会触发事件
            publisher.DoSumething();

        }
    }
}
