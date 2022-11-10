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
        [Key]
        [Column("POSTID")]
        public int Id { get; set; }

        [Column("POSTTEXT", TypeName ="nvarchar(500)")]
        public string Text { get; set; }

        [Column("POSTPUBLICATION", TypeName ="datetime")]
        public DateTime Publication { get; set; }

        [Column("POSTLIKE")]
        public int Like { get; set; }
        //Внешние
    }
}
