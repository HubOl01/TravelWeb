using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWebAPI.Models;

namespace TravelWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TravelDetailsController : ControllerBase
    {
        private readonly TravelModelContext _context;

        public TravelDetailsController(TravelModelContext context)
        {
            _context = context;
        }

        // GET: api/TravelDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelDetail>>> GetTravelDetails()
        {
            return await _context.TravelDetails.Include(place => place.Places).ToListAsync();
        }

        // GET: api/TravelDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TravelDetail>> GetTravelDetail(int id)
        {
            var travelDetail = await _context.TravelDetails.FindAsync(id);

            if (travelDetail == null)
            {
                return NotFound();
            }

            return travelDetail;
        }

        // PUT: api/TravelDetails/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTravelDetail(int id, TravelDetail travelDetail)
        {
            if (id != travelDetail.Id)
            {
                return BadRequest();
            }

            _context.Entry(travelDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TravelDetailExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(await _context.TravelDetails.Include(place => place.Places).ToListAsync());
        }

        // POST: api/TravelDetails
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TravelDetail>> PostTravelDetail(TravelDetail travelDetail)
        {
            _context.TravelDetails.Add(travelDetail);
            await _context.SaveChangesAsync();
            //CreatedAtAction("GetTravelDetail", new { id = travelDetail.Id }, travelDetail)
            return Ok(await _context.TravelDetails.Include(place => place.Places).ToListAsync());
        }

        // DELETE: api/TravelDetails/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTravelDetail(int id)
        {
            var travelDetail = await _context.TravelDetails.FindAsync(id);
            if (travelDetail == null)
            {
                return NotFound();
            }

            _context.TravelDetails.Remove(travelDetail);
            await _context.SaveChangesAsync();

            return Ok(await _context.TravelDetails.Include(place => place.Places).ToListAsync());
        }

        private bool TravelDetailExists(int id)
        {
            return _context.TravelDetails.Any(e => e.Id == id);
        }
    }
}
