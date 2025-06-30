using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWebAPI.Models;


namespace TravelWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelController : ControllerBase
    {
        private readonly TravelModelContext _context;

        public TravelController(TravelModelContext context)
        {
            _context = context;
        }

        // GET: api/travel
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelDetail>>> GetAllTravels()
        {
            return await _context.TravelDetails
                .Include(t => t.Places)
                .ToListAsync();
        }

        // GET: api/travel/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TravelDetail>> GetTravel(int id)
        {
            var travel = await _context.TravelDetails
                .Include(t => t.Places)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (travel == null) return NotFound();
            return travel;
        }

        // POST: api/travel
        [HttpPost]
        public async Task<ActionResult<TravelDetail>> CreateTravel(TravelDetail travel)
        {
            _context.TravelDetails.Add(travel);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTravel), new { id = travel.Id }, travel);
        }

        // PUT: api/travel/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTravel(int id, TravelDetail updatedTravel)
        {
            if (id != updatedTravel.Id) return BadRequest();

            _context.Entry(updatedTravel).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/travel/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravel(int id)
        {
            var travel = await _context.TravelDetails.FindAsync(id);
            if (travel == null) return NotFound();

            _context.TravelDetails.Remove(travel);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
