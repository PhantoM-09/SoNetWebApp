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
        [Key]
        [Column("MESSAGEID")]
        public int Id { get; set; }

        [Column("MESSAGETEXT", TypeName = "nvarchar(500)")]
        public string Text { get; set; }

        [Column("MESSAGECREATE", TypeName = "datetime")]
        public DateTime Create { get; set; }
    }
}
