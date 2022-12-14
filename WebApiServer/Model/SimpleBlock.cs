namespace WebApiServer.Model
{
    public class SimpleBlock
    {
        public int BlockId { get; set; }

        public string BlockReason { get; set; }

        public DateTime BlockStart { get; set; }

        public DateTime BlockEnd { get; set; }
    }
}
