using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Xml;
using BASECONFIG;

namespace BLL.VX
{
    
    public class MessageHelp
    {

        string wx_noview = baseconfig.VX_URL_OF_NONE_VIEW ;

        public bool Post(string amc_id, OPR_TYP msg_typ)
        { 
            string url = baseconfig.VX_URL_OF_APPROVL_ALERT + 
                "?amc_id=" + amc_id +
                "&mode=" + Convert.ToInt32(msg_typ).ToString() +
                "&action=_I_Approval_Msg" +
                "&key_post=34986aelafja98we45u6oqj2naewf98uw89456h2q873zsoidjhi68278935234sadg";
    
            WebClient wb = new WebClient();

            wb.Encoding = Encoding.UTF8;
            byte[] by = System.Text.Encoding.UTF8.GetBytes("");
            byte[] responseData = wb.UploadData(url, "post", by); //得到返回字符流
            var result = Encoding.UTF8.GetString(responseData); //解码 

            return Convert.ToInt32(result) == 1; 
        }
        public bool Post(string open_id,
            //标题
            string card_msg_title,
            //内容 
            string msg_content,
            //连接 
            string dir_url)
        {

            string url = baseconfig.VX_URL_OF_APPROVL_ALERT +
                "?action=_I_Alert_Msg" +
                "&open_id=" + open_id +
                "&card_msg_title=" + card_msg_title +
                "&msg_content=" + msg_content +
                "&dir_url=" + (dir_url.Equals(string.Empty) ? wx_noview : dir_url) +
                "&key_post=34986aelafja98we45u6oqj2naewf98uw89456h2q873zsoidjhi68278935234sadg";


            WebClient wb = new WebClient();

            wb.Encoding = Encoding.UTF8;
            byte[] by = System.Text.Encoding.UTF8.GetBytes("");
            byte[] responseData = wb.UploadData(url, "post", by); //得到返回字符流
            var result = Encoding.UTF8.GetString(responseData); //解码 

            return Convert.ToInt32(result) == 1;
        }
        
      
        
        #region 拆封消息
        #region 消息类型
         
        public enum OPR_TYP { create, reset, gonext, goback, delete, giveother, file, message,alert };
         
        #endregion
        #endregion
    }
}
