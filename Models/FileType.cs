using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("CFTYPE")]
    public class FileType
    {
        [Key]
        [Column("FTYPEID")]
        public int Id { get; set; }

        [Column("FTYPENAME", TypeName = "nvarchar(15)")]
        public string Name { get; set; }

        [Column("FTYPEDESCRIPTION", TypeName = "nvarchar(50)")]
        public string Description { get; set; }
    }
}
