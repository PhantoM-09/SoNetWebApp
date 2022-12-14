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
    public class Block
    {
        [Column("BLOCKID")]
        public int BlockId { get; set; }

        [Column("BLOCKREASON")]
        public string BlockReason { get; set; }

        [Column("BLOCKSTART")]
        public DateTime BlockStart { get; set; }

        [Column("BLOCKEND")]
        public DateTime BlockEnd { get; set; }

        public virtual ICollection<User> Users { get; set; }
    }
}
