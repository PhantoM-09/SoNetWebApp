using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("STRGFILE")]
    public class File
    {
        [Key]
        [Column("FILEID")]
        public string Id { get; set; }

        [Column("FILENAME", TypeName = "nvarchar(50)")]
        public string Name { get; set; }

        [Column("FILEDRIVE", TypeName = "nvarchar(50)")]
        public string Drive { get; set; }
    }
}
