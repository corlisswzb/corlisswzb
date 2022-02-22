using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CAL.ld_query_fee_group
{
    public class ld_fee_group_info
    {
        string _No;

        public string No
        {
            get { return _No; }
            set { _No = value; }
        }

        string _fee_cu_desc;

        public string Fee_cu_desc
        {
            get { return _fee_cu_desc; }
            set { _fee_cu_desc = value; }
        }
        string _cr_name;

        public string Cr_name
        {
            get { return _cr_name; }
            set { _cr_name = value; }
        }
        string _fee_amount;

        public string Fee_amount
        {
            get { return _fee_amount; }
            set { _fee_amount = value; }
        }
        string _woa_total_money;

        public string Woa_total_money
        {
            get { return _woa_total_money; }
            set { _woa_total_money = value; }
        }
        string _woa_total_money_of_noneinvoice;

        public string Woa_total_money_of_noneinvoice
        {
            get { return _woa_total_money_of_noneinvoice; }
            set { _woa_total_money_of_noneinvoice = value; }
        }
        string _woa_total_money_of_invoice;

        public string Woa_total_money_of_invoice
        {
            get { return _woa_total_money_of_invoice; }
            set { _woa_total_money_of_invoice = value; }
        }
        string _unwoa_total_money;

        public string Unwoa_total_money
        {
            get { return _unwoa_total_money; }
            set { _unwoa_total_money = value; }
        }
        string _unwoa_total_money_of_noneinvoice;

        public string Unwoa_total_money_of_noneinvoice
        {
            get { return _unwoa_total_money_of_noneinvoice; }
            set { _unwoa_total_money_of_noneinvoice = value; }
        }
        string _unwoa_total_money_of_invoice;

        public string Unwoa_total_money_of_invoice
        {
            get { return _unwoa_total_money_of_invoice; }
            set { _unwoa_total_money_of_invoice = value; }
        }
        string _fee_amount_of_uncommit;

        public string Fee_amount_of_uncommit
        {
            get { return _fee_amount_of_uncommit; }
            set { _fee_amount_of_uncommit = value; }
        }
        string _fee_amount_of_uncommit_of_noneinvoice;

        public string Fee_amount_of_uncommit_of_noneinvoice
        {
            get { return _fee_amount_of_uncommit_of_noneinvoice; }
            set { _fee_amount_of_uncommit_of_noneinvoice = value; }
        }
        string _fee_amount_of_uncommit_of_invoice;

        public string Fee_amount_of_uncommit_of_invoice
        {
            get { return _fee_amount_of_uncommit_of_invoice; }
            set { _fee_amount_of_uncommit_of_invoice = value; }
        }
        string _fee_amount_of_commit;

        public string Fee_amount_of_commit
        {
            get { return _fee_amount_of_commit; }
            set { _fee_amount_of_commit = value; }
        }
        string _woa_amount_of_commit;

        public string Woa_amount_of_commit
        {
            get { return _woa_amount_of_commit; }
            set { _woa_amount_of_commit = value; }
        }
        string _woa_amount_of_commit_of_noneinvoice;

        public string Woa_amount_of_commit_of_noneinvoice
        {
            get { return _woa_amount_of_commit_of_noneinvoice; }
            set { _woa_amount_of_commit_of_noneinvoice = value; }
        }
        string _woa_amount_of_commit_of_invoice;

        public string Woa_amount_of_commit_of_invoice
        {
            get { return _woa_amount_of_commit_of_invoice; }
            set { _woa_amount_of_commit_of_invoice = value; }
        }
        string _woa_amount_of_commit_of_invoice_of_unrecord;

        public string Woa_amount_of_commit_of_invoice_of_unrecord
        {
            get { return _woa_amount_of_commit_of_invoice_of_unrecord; }
            set { _woa_amount_of_commit_of_invoice_of_unrecord = value; }
        }
        string _woa_amount_of_commit_of_invoice_of_record;

        public string Woa_amount_of_commit_of_invoice_of_record
        {
            get { return _woa_amount_of_commit_of_invoice_of_record; }
            set { _woa_amount_of_commit_of_invoice_of_record = value; }
        }
        string _unwoa_amount_of_commit;

        public string Unwoa_amount_of_commit
        {
            get { return _unwoa_amount_of_commit; }
            set { _unwoa_amount_of_commit = value; }
        }
        string _unwoa_amount_of_commit_of_noneinvoice;

        public string Unwoa_amount_of_commit_of_noneinvoice
        {
            get { return _unwoa_amount_of_commit_of_noneinvoice; }
            set { _unwoa_amount_of_commit_of_noneinvoice = value; }
        }
        string _unwoa_amount_of_commit_of_invoice;

        public string Unwoa_amount_of_commit_of_invoice
        {
            get { return _unwoa_amount_of_commit_of_invoice; }
            set { _unwoa_amount_of_commit_of_invoice = value; }
        }
        string _unwoa_amount_of_commit_of_invoice_of_unrecord;

        public string Unwoa_amount_of_commit_of_invoice_of_unrecord
        {
            get { return _unwoa_amount_of_commit_of_invoice_of_unrecord; }
            set { _unwoa_amount_of_commit_of_invoice_of_unrecord = value; }
        }
        string _unwoa_amount_of_commit_of_invoice_of_record;

        public string Unwoa_amount_of_commit_of_invoice_of_record
        {
            get { return _unwoa_amount_of_commit_of_invoice_of_record; }
            set { _unwoa_amount_of_commit_of_invoice_of_record = value; }
        }
        string _unwoa_amount_of_commit_of_limit;

        public string Unwoa_amount_of_commit_of_limit
        {
            get { return _unwoa_amount_of_commit_of_limit; }
            set { _unwoa_amount_of_commit_of_limit = value; }
        }
        string _unwoa_amount_of_commit_of_unlimitstring;

        public string Unwoa_amount_of_commit_of_unlimitstring
        {
            get { return _unwoa_amount_of_commit_of_unlimitstring; }
            set { _unwoa_amount_of_commit_of_unlimitstring = value; }
        }

        public ld_fee_group_info(
            string no,
            string fee_cu_desc, 
            string cr_name,
            string fee_amount,
            string woa_total_money,
            string woa_total_money_of_noneinvoice,
            string woa_total_money_of_invoice,
            string unwoa_total_money,
            string unwoa_total_money_of_noneinvoice,
            string unwoa_total_money_of_invoice,
            string fee_amount_of_uncommit,
            string fee_amount_of_uncommit_of_noneinvoice,
            string fee_amount_of_uncommit_of_invoice,
            string fee_amount_of_commit,
            string woa_amount_of_commit,
            string woa_amount_of_commit_of_noneinvoice,
            string woa_amount_of_commit_of_invoice,
            string woa_amount_of_commit_of_invoice_of_unrecord,
            string woa_amount_of_commit_of_invoice_of_record,
            string unwoa_amount_of_commit,
            string unwoa_amount_of_commit_of_noneinvoice,
            string unwoa_amount_of_commit_of_invoice,
            string unwoa_amount_of_commit_of_invoice_of_unrecord,
            string unwoa_amount_of_commit_of_invoice_of_record,
            string unwoa_amount_of_commit_of_limit,
            string unwoa_amount_of_commit_of_unlimitstring)
        {
            _No = no;
            _fee_cu_desc = fee_cu_desc;
            _cr_name = cr_name;
            _fee_amount = fee_amount;
            _woa_total_money = woa_total_money;
            _woa_total_money_of_noneinvoice = woa_total_money_of_noneinvoice;
            _woa_total_money_of_invoice = woa_total_money_of_invoice;
            _unwoa_total_money = unwoa_total_money;
            _unwoa_total_money_of_noneinvoice = unwoa_total_money_of_noneinvoice;
            _unwoa_total_money_of_invoice = unwoa_total_money_of_invoice;
            _fee_amount_of_uncommit = fee_amount_of_uncommit;
            _fee_amount_of_uncommit_of_noneinvoice = fee_amount_of_uncommit_of_noneinvoice;
            _fee_amount_of_uncommit_of_invoice = fee_amount_of_uncommit_of_invoice;
            _fee_amount_of_commit = fee_amount_of_commit;
            _woa_amount_of_commit = woa_amount_of_commit;
            _woa_amount_of_commit_of_noneinvoice = woa_amount_of_commit_of_noneinvoice;
            _woa_amount_of_commit_of_invoice = woa_amount_of_commit_of_invoice;
            _woa_amount_of_commit_of_invoice_of_unrecord = woa_amount_of_commit_of_invoice_of_unrecord;
            _woa_amount_of_commit_of_invoice_of_record = woa_amount_of_commit_of_invoice_of_record;
            _unwoa_amount_of_commit = unwoa_amount_of_commit;
            _unwoa_amount_of_commit_of_noneinvoice = unwoa_amount_of_commit_of_noneinvoice;
            _unwoa_amount_of_commit_of_invoice = unwoa_amount_of_commit_of_invoice;
            _unwoa_amount_of_commit_of_invoice_of_unrecord = unwoa_amount_of_commit_of_invoice_of_unrecord;
            _unwoa_amount_of_commit_of_invoice_of_record = unwoa_amount_of_commit_of_invoice_of_record;
            _unwoa_amount_of_commit_of_limit = unwoa_amount_of_commit_of_limit;
            _unwoa_amount_of_commit_of_unlimitstring = unwoa_amount_of_commit_of_unlimitstring;
        }

        public ld_fee_group_info()
        {

        }
    }
}
