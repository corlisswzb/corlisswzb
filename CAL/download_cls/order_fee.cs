using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CAL.download_cls
{
    public class order_fee
    {
        int _index;

        public int Index
        {
            get { return _index; }
            set { _index = value; }
        }

        string _od_no;

        public string Od_no
        {
            get { return _od_no; }
            set { _od_no = value; }
        }
        DateTime _fee_dat;

        public string Fee_dat
        {
            get { return _fee_dat.ToString("yyyy-MM-dd"); }
            set { _fee_dat = Convert.ToDateTime( value); }
        }
        string _od_bill_no;

        public string Od_bill_no
        {
            get { return _od_bill_no; }
            set { _od_bill_no = value; }
        }
        string _od_place_start;

        public string Od_place_start
        {
            get { return _od_place_start; }
            set { _od_place_start = value; }
        }
        string _od_place_end;

        public string Od_place_end
        {
            get { return _od_place_end; }
            set { _od_place_end = value; }
        }
        string _fee_item_desc;

        public string Fee_item_desc
        {
            get { return _fee_item_desc; }
            set { _fee_item_desc = value; }
        }
        double _fee_price;

        public string Fee_price
        {
            get { return _fee_price.ToString("0.00"); }
            set { _fee_price = Convert.ToDouble( value); }
        }
        double _fee_number;

        public string Fee_number
        {
            get { return  _fee_number.ToString("0.00"); }
            set { _fee_number = Convert.ToDouble(value); }
        }
        string _fee_cr_cod;

        public string Fee_cr_cod
        {
            get { return _fee_cr_cod; }
            set { _fee_cr_cod = value; }
        }
        string _fee_cr_code;

        public string Fee_cr_code
        {
            get { return _fee_cr_code; }
            set { _fee_cr_code = value; }
        }
        string _fee_unit_desc;

        public string Fee_unit_desc
        {
            get { return _fee_unit_desc; }
            set { _fee_unit_desc = value; }
        }
        double _fee_amount;

        public string Fee_amount
        {
            get { return _fee_cr_code + _fee_amount.ToString("0.00"); }
            set { _fee_amount = Convert.ToDouble(value); }
        }
        string _fee_invoice_typ_desc;

        public string Fee_invoice_typ_desc
        {
            get { return _fee_invoice_typ_desc; }
            set { _fee_invoice_typ_desc = value; }
        }

        double _woa_money;

        public string Woa_money
        {
            get { return _fee_cr_code + _woa_money.ToString("0.00"); }
            set { _woa_money = Convert.ToDouble(value);}
        }

        string _ca_amc_id;

        public string Ca_amc_id
        {
            get { return _ca_amc_id; }
            set { _ca_amc_id = value; }
        }
        string _od_amc_id;

        public string Od_amc_id
        {
            get { return _od_amc_id; }
            set { _od_amc_id = value; }
        }


        string _oi_no;

        public string Oi_no
        {
            get { return _oi_no; }
            set { _oi_no = value; }
        }
        string _fee_bak;

        public string Fee_bak
        {
            get { return _fee_bak; }
            set { _fee_bak = value; }
        }

       

        public order_fee(int index,
            string od_no,
            DateTime fee_dat,
            string od_bill_no,
            string od_place_start,
            string od_place_end,
            string fee_item_desc,
            double fee_price,
            double fee_number,
            string fee_cr_code,
            string fee_cr_cod,
            string fee_unit_desc,
            double fee_amount,
            string fee_invoice_typ_desc,
            double woa_money,
            string ca_amc_id,
            string od_amc_id,
            string oi_no,
            string fee_bak
            )
        {
            _fee_cr_cod = fee_cr_cod;
            _fee_bak = fee_bak;
            _oi_no = oi_no;
            _ca_amc_id = ca_amc_id;
            _od_amc_id = od_amc_id;
            _woa_money = woa_money;
            _index = index;
            _od_bill_no = od_bill_no;
            _od_no = od_no;
            _fee_dat = fee_dat;
            _od_place_end = od_place_end;
            _od_place_start = od_place_start;
            _fee_item_desc = fee_item_desc;
            _fee_price = fee_price;
            _fee_number = fee_number;
            _fee_cr_code = fee_cr_code;
            _fee_unit_desc = fee_unit_desc;
            _fee_amount = fee_amount;
            _fee_invoice_typ_desc = fee_invoice_typ_desc;
        }

        public order_fee( int index, 
            string od_no,
            DateTime fee_dat,
            string od_bill_no,
            string od_place_start,
            string od_place_end,
            string fee_item_desc,
            double fee_price,
            double fee_number,

            string fee_cr_code,
            string fee_unit_desc,
            double fee_amount,
            string fee_invoice_typ_desc 
            )
        {
            _index = index;
            _od_bill_no = od_bill_no;
            _od_no = od_no;
            _fee_dat = fee_dat;
            _od_place_end = od_place_end;
            _od_place_start = od_place_start;
            _fee_item_desc = fee_item_desc;
            _fee_price = fee_price;
            _fee_number = fee_number;
            _fee_cr_code = fee_cr_code;
            _fee_unit_desc = fee_unit_desc;
            _fee_amount = fee_amount;
            _fee_invoice_typ_desc = fee_invoice_typ_desc;
        }

        public order_fee()
        {

        }

    }
}
