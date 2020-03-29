namespace DatingApp.Api.Helper
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        // small p
        private int pageSize = 10;  
        // caps P
        public int PageSize  
        {
            get { return pageSize; }  // here using small p
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        
    }
}