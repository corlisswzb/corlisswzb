using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CAL.ap_flow_details
{
    public class ap_flow_details
    {
        string _ap_opr_nam;

        public string Ap_opr_nam
        {
            get { return _ap_opr_nam; }
            set { _ap_opr_nam = value; }
        }
        string _aps_desc;

        public string Aps_desc
        {
            get { return _aps_desc; }
            set { _aps_desc = value; }
        }
        string _ap_context;

        public string Ap_context
        {
            get { return _ap_context; }
            set { _ap_context = value; }
        }
        string _ap_advice;

        public string Ap_advice
        {
            get { return _ap_advice; }
            set { _ap_advice = value; }
        }
        string _ap_opr_dat;

        public string Ap_opr_dat
        {
            get { return _ap_opr_dat; }
            set { _ap_opr_dat = value; }
        }

        public ap_flow_details(string ap_opr_nam,
            string aps_desc,
            string ap_context,
            string ap_advice,
            string ap_opr_dat)
        {
            _ap_advice = ap_advice;
            _ap_opr_dat = ap_opr_dat;
            _ap_opr_nam = ap_opr_nam;
            _aps_desc = aps_desc;
            _ap_context = ap_context;
        }
        
    }


    public class ap_flow
    {
        string _amc_no;
        string _amc_id;

        public string Amc_id
        {
            get { return _amc_id; }
            set { _amc_id = value; }
        }

        public string Amc_no
        {
            get { return _amc_no; }
            set { _amc_no = value; }
        }

        List<ap_flow_details> _lst_ap_flow;

        public List<ap_flow_details> Lst_ap_flow
        {
            get { return _lst_ap_flow; }
            set { _lst_ap_flow = value; }
        }

        public ap_flow(string amc_id,string amc_no)
        {
            _amc_id = amc_id;
            _amc_no = amc_no;
            _lst_ap_flow = new List<ap_flow_details>();
        }
        public ap_flow()
        {

        }

        public void push_flow(string ap_opr_nam,
            string aps_desc,
            string ap_context,
            string ap_advice,
            string ap_opr_dat){
                _lst_ap_flow.Add(new ap_flow_details(ap_opr_nam,
                aps_desc,
                ap_context,
                ap_advice,
                ap_opr_dat));
        }
    }
}
