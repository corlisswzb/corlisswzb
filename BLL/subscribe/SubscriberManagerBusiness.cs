using CAL.subscribe;
using System;

namespace BLL.subscribe
{
    //订阅者
    public class SubscriberManagerBusiness
    {
        //握手事件
        public void HandleEvent(string message)
        {
            //这里就可以开启使用系统了

        }

        //订阅用户
        public void SubscribeUser(int userId, SubscriptionType subscriptionType)
        {
            //根据订阅类型设置订阅周期
            DateTime startDate = DateTime.Today;
            DateTime endDate;
            if (subscriptionType == SubscriptionType.Monthly)
            {
                //续费一月
                endDate = startDate.AddMonths(1);
            }
            else
            {
                //续费一年
                endDate = startDate.AddYears(1);
            }

            //创建订阅对象
            Subscription subscription = new Subscription()
            {
                UserId = userId,
                SubscriptionType = subscriptionType,
                StartDate = startDate,
                EndDate = endDate,
                IsActive = true
            };

            //保存订阅信息到数据库中
            Console.WriteLine("user subscribed successfully.");
        }
   
        //检查订阅状态
        public void CheckSubscriptionStatus(int userId)
        {
            //根据用户ID从数据库获取订阅信息
            Subscription subscription = GetSubscriptionFromDatabase(userId);
            if (subscription != null && subscription.IsActive == true)
            {
                //检查订阅是否过期
                if(subscription.EndDate< DateTime.Today)
                {
                    //提示订阅已过期，请续费
                }
                else
                {
                    //在续费期间内
                }
            }
            else
            {
                //未找到订阅信息
            }
        }

        //续订订阅
        public void RenewSubscription(int userId)
        {
            //根据用户ID从数据库获取订阅信息
            Subscription subscription = GetSubscriptionFromDatabase(userId);
            if(subscription != null && subscription.IsActive == true)
            {
                //更新订阅信息
                subscription.StartDate = DateTime.Today;
                if(subscription.SubscriptionType == SubscriptionType.Monthly)
                {
                    subscription.EndDate = subscription.StartDate.AddMonths(1);
                }
                else
                {
                    subscription.EndDate = subscription.StartDate.AddYears(1);
                }

                //更新订阅信息到数据库中
            }
        }
   
        //辅助方法,从数据库获取订阅信息
        private Subscription GetSubscriptionFromDatabase(int userId)
        {
            //若订阅不存在，则返回null
            return null;
        }

    }
}
