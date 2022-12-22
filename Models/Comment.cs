using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("STRGCOMMENT")]
    public class Comment
    {
        [Column("COMMENTID")]
        public int CommentId { get; set; }

        [Column("COMMENTTEXT")]
        public string CommentText { get; set; }

        [Column("COMMENTSEND")]
        public DateTime CommentSend { get; set; }

        [Column("POSTID")]
        public int? PostId { get; set; }

        [Column("USERID")]
        public int? UserId { get; set; }

        public virtual Post? Post { get; set; }
        public virtual User? User { get; set; }
    }
}
