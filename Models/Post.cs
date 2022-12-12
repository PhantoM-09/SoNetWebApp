using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("STRGPOST")]
    public class Post
    {
        [Column("POSTID")]
        public int PostId { get; set; }

        [Column("POSTTEXT")]
        public string PostText { get; set; }

        [Column("POSTPUBLICATION")]
        public DateTime PostPublication { get; set; }

        [Column("USERID")]
        public int UserId { get; set; }

        public virtual User User { get; set; } 
        public virtual ICollection<Comment> Comments { get; set; }
        public virtual ICollection<Like> Likes { get; set; }
    }
}
