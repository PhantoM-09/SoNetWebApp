using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
    [Table("JLIKE")]
    public class Like
    {
        [Column("POSTID")]
        public int PostId { get; set; }

        [Column("USERID")]
        public int UserId { get; set; }

        public virtual Post Post { get; set; }
        public virtual User User { get; set; }
    }
}
