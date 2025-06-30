using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWebAPI.Models;

namespace TravelWebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PlaceController : ControllerBase
    {
        private readonly TravelModelContext _context;

        public PlaceController(TravelModelContext context)
        {
            _context = context;
        }

        // GET: api/place
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceModel>>> GetAllPlaces()
        {
            return await _context.PlaceModels.ToListAsync();
        }

        // GET: api/place/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceModel>> GetPlace(int id)
        {
            var place = await _context.PlaceModels.FindAsync(id);
            if (place == null) return NotFound();
            return place;
        }

        // POST: api/place
        [HttpPost]
        public async Task<ActionResult<PlaceModel>> CreatePlace(PlaceModel place)
        {
            _context.PlaceModels.Add(place);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPlace), new { id = place.Id }, place);
        }

        // PUT: api/place/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePlace(int id, PlaceModel place)
        {
            if (id != place.Id) return BadRequest();

            _context.Entry(place).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/place/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlace(int id)
        {
            var place = await _context.PlaceModels.FindAsync(id);
            if (place == null) return NotFound();

            _context.PlaceModels.Remove(place);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
