using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("JBLOCK")]
    public class UserBlock
    {
        [Key]
        [Column("BLOCKID")]
        public int Id { get; set; }

        [Column("BLOCKREASON", TypeName = "nvarchar(100)")]
        public string BlockReason { get; set; }

        [Column("BLOCKSTART", TypeName="datetime")]
        public DateTime BLockStart { get; set; }

        [Column("BLOCKEND", TypeName = "datetime")]
        public DateTime BLockEnd { get; set; }

        //Внешние
    }
}
