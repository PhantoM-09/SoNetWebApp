using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("STRGMESSAGE")]
    public  class Message
    {
        [Column("MESSAGEID")]
        public int MessageId { get; set; }

        [Column("MESSAGETEXT")]
        public string MessageText { get; set; }

        [Column("MESSAGECREATE")]
        public DateTime MessageCreate { get; set; }

        [Column("MESSAGEGROUPNAME")]
        public string MessageGroupName { get; set; }

        [Column("USERSENDER")]
        public int UserSenderId { get; set; }

        [Column("USERRECEIVER")]
        public int UserReceiverId { get; set; }

        public virtual User UserSend { get; set; }
        public virtual User UserReceive { get; set; }
    }
}
