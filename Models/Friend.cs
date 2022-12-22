using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("RFRIEND")]
    public class Friend
    {
        [Column("RELATIONID")]
        public int RelationId { get; set; }
        [Column("RELATION")]
        public int FriendRelation { get; set; }

        [Column("USERID")]
        public int? UserId { get; set; }

        [Column("FRIENDID")]
        public int? FriendId { get; set; }

        public virtual User? User { get; set; }
        public virtual User? FriendUser { get; set; }
    }
}
