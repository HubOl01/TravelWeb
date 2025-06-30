using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TravelWebAPI.Models
{
    public class PlaceModel
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Image {  get; set; } = string.Empty;
        public int TravelDetailId { get; set; }
        
        [JsonIgnore]
        public TravelDetail? TravelDetail { get; set; }
    }
}
