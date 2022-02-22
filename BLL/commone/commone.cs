using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Security.Cryptography;
using System.Data;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.Web;

namespace BLL.commone
{
    public enum WXMSG_TYP { create, update, gonext, goback, delete, giveother, file };

    
    public static class BLL_commone{

        
        public static DateTime get_sysdate()
        {
            try
            {
                return DAL.commone.DAL_commone.get_sysdate();
            }
            catch (Exception e)
            {
                return System.DateTime.Now;
            }
        }

 

        #region json格式

        //datatable转换成 {} 格式字符串
        public static string data_convert_json(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0)
            {
                return "{\"total\":0,\"rows\":[]}";
            }
            else
            {
                string context = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                return "{\"total\":" + dt.Rows.Count + ",\"rows\":" + context + "}";
            }
        }

        public static string data_convert_json(DataTable dt, int total)
        {
            if (dt == null || dt.Rows.Count == 0)
            {
                return "{\"total\":0,\"rows\":[]}";
            }
            else
            {
                string context = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                return "{\"total\":" + total + ",\"rows\":" + context + "}";
            }
        }
        public static string data_convert_json(DataTable dt, int total, List<KeyValuePair<string, string>> other_params)
        {
            JObject jo = new JObject();

            JArray ja = (Newtonsoft.Json.Linq.JArray)JsonConvert.DeserializeObject(Newtonsoft.Json.JsonConvert.SerializeObject(dt));
             
                
            jo["total"] = total;
            jo["rows"] = ja; 
             
            foreach (KeyValuePair<string, string> k in other_params)
            {
                jo[k.Key] = k.Value;
            }

            return jo.ToString();

        }
        ///datatable转换成 [] 格式字符串 
        public static string data_convert_jsonarray(DataTable dt)
        {
            if (dt == null || dt.Rows.Count == 0)
            {
                return "[]";
            }
            else
            {
                string context = Newtonsoft.Json.JsonConvert.SerializeObject(dt);
                return context;
            }
        }



        public static string result_convert_json(int result, string msg)
        {
            return "{\"result\":" + result + ",\"msg\":\"" + msg + "\"}";
        }
        public static string result_convert_json(int result, string msg, List<KeyValuePair<string, string>> other_params)
        {
            string json = "{\"result\":" + result + ",\"msg\":\"" + msg + "\",";

            if (other_params != null && other_params.Count > 0)
            {
                foreach (KeyValuePair<string, string> k in other_params)
                {
                    if (k.Value.Length > 0 && k.Value[0] == '[')
                    {
                        json += "\"" + k.Key + "\":" + k.Value + ",";
                    }
                    else
                    {
                        json += "\"" + k.Key + "\":\"" + k.Value + "\",";
                    }

                }
                if (json.Length > 1)
                {
                    json = json.Substring(0, json.Length - 1);
                }
            }

            json += "}";
            return json;
        }

        public static string custom_convert_json(List<KeyValuePair<string, string>> other_params)
        {
            string json = "{";

            if (other_params != null && other_params.Count > 0)
            {
                foreach (KeyValuePair<string, string> k in other_params)
                {
                    if (k.Value.Length > 0 && k.Value[0] == '[')
                    {
                        json += "\"" + k.Key + "\":" + k.Value + ",";
                    }
                    else
                    {
                        json += "\"" + k.Key + "\":\"" + k.Value + "\",";
                    }
                }

                if (json.Length > 1)
                {
                    json = json.Substring(0, json.Length - 1);
                }
            }

            json += "}";
            return json;
        }
        #endregion
    }
}
