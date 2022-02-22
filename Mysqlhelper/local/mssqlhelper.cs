using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using BASECONFIG;

///本地数据库连接
///V1.0
namespace mySqlHelper.Local
{
    public class msSqlHelper
    {
        string connString = string.Empty;
        public msSqlHelper()
        { 
            connString = string.Format("pooling=true;min pool size=10;max pool size=512;connect timeout=20;Data Source={0};uid={1};pwd={2};Integrated Security=SSPI;Initial Catalog={3};Integrated Security=False",
                baseconfig.Sql_IP,
                baseconfig.Sql_UID,
                baseconfig.Sql_PWD,
                baseconfig.Sql_DBNAME);
        }  
        //1得到datatable 
        public DataTable getData(string sql)
        {
            SqlConnection conn = null;
            SqlDataAdapter adapter = null;
            try
            {
                //连接数据库
                conn = new SqlConnection(connString);
                //使用adapter
                adapter = new SqlDataAdapter(sql, conn);

                DataTable re_dt = new DataTable();

                adapter.Fill(re_dt);

                return re_dt;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (adapter != null)
                {
                    adapter.Dispose();
                }

                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                        conn.Dispose();
                    }
                }
            }
        }
        //2.执行并范围影响行数
        public int excuteScale(string sql)
        {
            SqlConnection conn = null;
            SqlCommand command = null;
            try
            {
                //连接数据库
                conn = new SqlConnection(connString);
                conn.Open();
                //执行
                command = new SqlCommand(sql, conn);

                int result = command.ExecuteNonQuery();

                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                        conn.Dispose();
                    }
                }
            }
        }
        //3.得到唯一一行数据
        public object getScale(string sql)
        {
            SqlConnection conn = null;
            SqlCommand command = null;
            try
            {
                //连接数据库
                conn = new SqlConnection(connString);
                conn.Open();
                //执行
                command = new SqlCommand(sql, conn);

                object result = command.ExecuteScalar();

                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                        conn.Dispose();
                    }
                }
            }
        }

        //4.调用存储过程 不返回datatable
        public int excuteStoredProcedureNoData(string procname, List<SqlParameter> inparams, ref List<SqlParameter> outparams)
        {
            SqlConnection conn = null;
            SqlCommand command = null;
            try
            {
                conn = new SqlConnection(connString);
                command = new SqlCommand(procname, conn);
                command.CommandType = CommandType.StoredProcedure;

                if (inparams != null && inparams.Count > 0) command.Parameters.AddRange(inparams.ToArray());
                if (outparams != null && outparams.Count > 0) command.Parameters.AddRange(outparams.ToArray());
                conn.Open();//打开数据库连接 
                int result = command.ExecuteNonQuery();
                return result;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                        conn.Dispose();
                    }
                }
            } 
        }

        //5.调用存储过程 返回datatable
        public DataTable excuteStoredProcedureData(string procname, List<SqlParameter> inparams, ref List<SqlParameter> outparams)
        {
            SqlConnection conn = null;
            SqlCommand command = null;
            try
            {
                conn = new SqlConnection(connString);
                command = new SqlCommand(procname, conn);
                //command.CommandTimeout = 12900;
                command.CommandType = CommandType.StoredProcedure;

                if (inparams != null && inparams.Count > 0) command.Parameters.AddRange(inparams.ToArray());
                if (outparams != null && outparams.Count > 0) command.Parameters.AddRange(outparams.ToArray());

                SqlDataAdapter ad = new SqlDataAdapter();
                ad.SelectCommand = command;
                DataTable dt = new DataTable();
                ad.Fill(dt);
                return dt;
            }
            catch (Exception e)
            {
                throw e;
            }
            finally
            {
                if (command != null)
                {
                    command.Dispose();
                }
                if (conn != null)
                {
                    if (conn.State == ConnectionState.Open)
                    {
                        conn.Close();
                        conn.Dispose();
                    }
                }
            }
        }
    }
}