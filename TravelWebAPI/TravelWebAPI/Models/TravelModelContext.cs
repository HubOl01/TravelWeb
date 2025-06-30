using Microsoft.EntityFrameworkCore;

namespace TravelWebAPI.Models
{
    public class TravelModelContext : DbContext
    {
        public TravelModelContext(DbContextOptions options) : base(options)
        {
        }

        protected TravelModelContext()
        {
        }
        public DbSet<TravelDetail> TravelDetails { get; set; }
        public DbSet<PlaceModel> PlaceModels { get; set; }
    }
}
