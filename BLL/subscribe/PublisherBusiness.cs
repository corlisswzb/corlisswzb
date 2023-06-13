using System;

namespace BLL.subscribe
{
    //定义事件的委托类型
    public delegate void EventHandler(string message);

    //发布者,负责发布事件
    public class PublisherBusiness
    {
        //声明事件，委托类型是EventHandler
        public event EventHandler EventOccurred;

        //标记变量，标识是否启用订阅模式
        private bool subscriptionEnabled;
        
        //用户付费后启用订阅模式的方法
        public void EnableSubscription()
        {
            subscriptionEnabled = true;
        }

        //用户取消订阅后禁用订阅模式的方法
        public void DisableSubscription()
        {
            subscriptionEnabled = false;
        }

        //触发事件的方法
        public void DoSumething()
        {
            //执行某些操作

            //检查订阅模式是否启用
            if(subscriptionEnabled)
            {
                //触发事件
                onEventOccurred("");
            }
        }

        //触发事件的辅助方法
        protected virtual void onEventOccurred(string message)
        {
            //检查是否有订阅者
            if(EventOccurred != null)
            {
                //触发事件
                EventOccurred(message);
            }
        }
    }
}
