using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models
{
    [Table("CRELATIONTYPE")]
    public class RelationType
    {
        [Key]
        [Column("RELATIONTYPEID")]
        public int Id { get; set; }

        [Column("RELATIONTYPENAME", TypeName ="nvarchar(15)")]
        public string Name { get; set; }

        [Column("RELATIONTYPEDESCRIPTION", TypeName ="nvarchar(50)")]
        public string Description { get; set; }
    }
}
