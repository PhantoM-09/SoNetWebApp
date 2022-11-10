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
        [Key]
        [Column("COMMENTID")]
        public int Id { get; set; }

        [Column("COMMENTTEXT", TypeName = "nvarchar(1000)")]
        public string Text { get; set; }

        [Column("COMMENTSEND", TypeName ="datetime")]
        public DateTime Send { get; set; }

        //Внешние
    }
}
