using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CAL.order_cntr
{
    public class cls_order_cntr
    {
        string _cntr_no;

        public string Cntr_no
        {
            get { return _cntr_no; }
            set { _cntr_no = value; }
        }
        string _eqp_typ;

        public string Eqp_typ
        {
            get { return _eqp_typ; }
            set { _eqp_typ = value; }
        }
        string _seal_no;

        public string Seal_no
        {
            get { return _seal_no; }
            set { _seal_no = value; }
        }
        string _bill_no;

        public string Bill_no
        {
            get { return _bill_no; }
            set { _bill_no = value; }
        }
        string _cargo_net_wgt;

        public string Cargo_net_wgt
        {
            get { return _cargo_net_wgt; }
            set { _cargo_net_wgt = value; }
        }
        string _cargo_pick_number;

        public string Cargo_pick_number
        {
            get { return _cargo_pick_number; }
            set { _cargo_pick_number = value; }
        }
        string _cargo_bluk;

        public string Cargo_bluk
        {
            get { return _cargo_bluk; }
            set { _cargo_bluk = value; }
        }
        string _opr_cod;

        public string Opr_cod
        {
            get { return _opr_cod; }
            set { _opr_cod = value; }
        }
        string _customs_seal_no;

        public string Customs_seal_no
        {
            get { return _customs_seal_no; }
            set { _customs_seal_no = value; }
        }
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
        string _customs_hs_cod;

        public string Customs_hs_cod
        {
            get { return _customs_hs_cod; }
            set { _customs_hs_cod = value; }
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
        string _cargo_goods_desc;

        public string Cargo_goods_desc
        {
            get { return _cargo_goods_desc; }
            set { _cargo_goods_desc = value; }
        }
        string _customs_ship_no;

        public string Customs_ship_no
        {
            get { return _customs_ship_no; }
            set { _customs_ship_no = value; }
        }

        string _cntr_gross_wgt;

        public string Cntr_gross_wgt
        {
            get { return _cntr_gross_wgt; }
            set { _cntr_gross_wgt = value; }
        }
        int _cntr_order_by_id;

        public int Cntr_order_by_id
        {
            get { return _cntr_order_by_id; }
            set { _cntr_order_by_id = value; }
        }
        string _cargo_agent_desc;

        public string Cargo_agent_desc
        {
            get { return _cargo_agent_desc; }
            set { _cargo_agent_desc = value; }
        }

        int _cntr_pin_flag;

        public int Cntr_pin_flag
        {
            get { return _cntr_pin_flag; }
            set { _cntr_pin_flag = value; }
        }

        public cls_order_cntr()
        {

        }
        public cls_order_cntr(string cntr_no,
            string eqp_typ,
            string seal_no,
            string bill_no,
            string cargo_net_wgt,
            string cargo_pick_number,
            string cargo_bluk,
            string opr_cod,
            string customs_seal_no,
            string customs_voyage_no,
            string customs_ship_desc,
            string customs_hs_cod,
            string customs_load_port,
            string customs_disc_port,
            string cargo_goods_desc,
            string customs_ship_no,
            string cntr_gross_wgt,
            int cntr_order_by_id,
            string cargo_agent_desc,
            int cntr_pin_flag)
        {
            _cntr_pin_flag = cntr_pin_flag;
            _cntr_order_by_id = cntr_order_by_id;
            _cntr_gross_wgt = cntr_gross_wgt;
            _cargo_agent_desc = cargo_agent_desc;
            _cntr_no = cntr_no;
            _eqp_typ = eqp_typ;
            _seal_no = seal_no;
            _bill_no = bill_no;
            _cargo_net_wgt = cargo_net_wgt;
            _cargo_pick_number = cargo_pick_number;
            _cargo_bluk = cargo_bluk;
            _opr_cod = opr_cod;
            _customs_seal_no = customs_seal_no;
            _customs_voyage_no = customs_voyage_no;
            _customs_ship_desc = customs_ship_desc;
            _customs_hs_cod = customs_hs_cod;
            _customs_load_port = customs_load_port;
            _customs_disc_port = customs_disc_port;
            _cargo_goods_desc = cargo_goods_desc;
            _customs_ship_no = customs_ship_no;
        }
    }
}
