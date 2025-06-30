using System.ComponentModel.DataAnnotations;


namespace TravelWebAPI.Models
{
    public class TravelDetail
    {
        [Key]
        public int Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime DateTimeStart { get; set; }
        public DateTime DateTimeEnd { get; set; }
        public decimal Cost { get; set; }
        public List<PlaceModel> Places { get; set; } = new List<PlaceModel>();

    }
}
