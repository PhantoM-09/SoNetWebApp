using Microsoft.EntityFrameworkCore;
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
    [Index(nameof(UFileDrive), IsUnique = true)]
    public class UFile
    {
        [Column("FILEID")]
        public int UFileId { get; set; }

        [Column("FILENAME")]
        public string UFileName { get; set; }

        [Column("FILEDRIVE")]
        public string UFileDrive { get; set; }

        [Column("FILETYPE")]
        public string UFileType{ get; set; }

        [Column("USERID")]
        public int UserId { get; set; }

        public virtual User User { get; set; }
    }
}
