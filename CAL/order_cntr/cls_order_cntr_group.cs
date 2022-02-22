using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAL.order_cntr
{
    public class cls_order_cntr_group
    { 
        string _customs_voyage_no;

        public string Customs_voyage_no
        {
            get { return _customs_voyage_no; }
            set { _customs_voyage_no = value; }
        }
        string _customs_ship_desc;

        public string Customs_ship_desc
        {
            get { return _customs_ship_desc; }
            set { _customs_ship_desc = value; }
        }
       
        string _customs_load_port;

        public string Customs_load_port
        {
            get { return _customs_load_port; }
            set { _customs_load_port = value; }
        }
        string _customs_disc_port;

        public string Customs_disc_port
        {
            get { return _customs_disc_port; }
            set { _customs_disc_port = value; }
        }
        
        
        string _customs_ship_no;

        public string Customs_ship_no
        {
            get { return _customs_ship_no; }
            set { _customs_ship_no = value; }
        }

        //预配用的二级分层 
        List<cls_order_cntr_group_sub> _lst_group_sub;

        public List<cls_order_cntr_group_sub> Lst_group_sub
        {
            get { return _lst_group_sub; }
            set { _lst_group_sub = value; }
        }
        //重箱申报 
        List<cls_order_cntr_group_sub2> _lst_group_sub2;

        public List<cls_order_cntr_group_sub2> Lst_group_sub2
        {
            get { return _lst_group_sub2; }
            set { _lst_group_sub2 = value; }
        }
         

        public cls_order_cntr_group()
        {
            _lst_group_sub2 = new List<cls_order_cntr_group_sub2>();
            _lst_group_sub = new List<cls_order_cntr_group_sub>();
            _count = 1;
        }

        int _count;

        public int Count
        {
            get { return _count; }
            set { _count = value; }
        }


        public cls_order_cntr_group( 
            string customs_voyage_no,
            string customs_ship_desc, 
            string customs_load_port,
            string customs_disc_port, 
            string customs_ship_no)
        {
            _customs_voyage_no = customs_voyage_no;
            _customs_ship_desc = customs_ship_desc; 
            _customs_load_port = customs_load_port;
            _customs_disc_port = customs_disc_port; 
            _customs_ship_no = customs_ship_no;
            _lst_group_sub2 = new List<cls_order_cntr_group_sub2>();
            _lst_group_sub = new List<cls_order_cntr_group_sub>();
            _count = 1;
        }
    }

    public class cls_order_cntr_group_sub
    {
        string _cargo_goods_desc;

        public string Cargo_goods_desc
        {
            get { return _cargo_goods_desc; }
            set { _cargo_goods_desc = value; }
        }
        string _bill_no;

        public string Bill_no
        {
            get { return _bill_no; }
            set { _bill_no = value; }
        }

        int _count;

        public int Count
        {
            get { return _count; }
            set { _count = value; }
        }

        public cls_order_cntr_group_sub()
        {
            _count = 1;
        }
        public cls_order_cntr_group_sub(
            string cargo_goods_desc,
            string bill_no )
        {
            _cargo_goods_desc = cargo_goods_desc;
            _bill_no = bill_no;
            _count = 1;
        }
    }

    public class cls_order_cntr_group_sub2 
    {
        string _cargo_agent_desc;

        public string Cargo_agent_desc
        {
            get { return _cargo_agent_desc; }
            set { _cargo_agent_desc = value; }
        }
        int _count;

        public int Count
        {
            get { return _count; }
            set { _count = value; }
        }

        List<cls_order_cntr_group_sub3> lst_sub3;

        public List<cls_order_cntr_group_sub3> Lst_sub3
        {
            get { return lst_sub3; }
            set { lst_sub3 = value; }
        }

        public cls_order_cntr_group_sub2()
        {
            lst_sub3 = new List<cls_order_cntr_group_sub3>();
            _count = 1;
        }

        public cls_order_cntr_group_sub2(string cargo_agent_desc)
        {
            lst_sub3 = new List<cls_order_cntr_group_sub3>();
            _cargo_agent_desc = cargo_agent_desc;
            _count = 1;
        }
    }

    public class cls_order_cntr_group_sub3
    {
        string _cntr_no;

        public string Cntr_no
        {
            get { return _cntr_no; }
            set { _cntr_no = value; }
        }
        int _count;

        public int Count
        {
            get { return _count; }
            set { _count = value; }
        }
        public cls_order_cntr_group_sub3()
        {
            _count = 1;
        }
        public cls_order_cntr_group_sub3(string cntr_no)
        {
            _cntr_no = cntr_no;
            _count = 1;
        }


    }
}
