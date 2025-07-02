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
    public class PlaceModelsController : ControllerBase
    {
        private readonly TravelModelContext _context;

        public PlaceModelsController(TravelModelContext context)
        {
            _context = context;
        }

        // GET: api/PlaceModels
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PlaceModel>>> GetPlaceModels()
        {
            return await _context.PlaceModels.ToListAsync();
        }

        // GET: api/PlaceModels/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PlaceModel>> GetPlaceModel(int id)
        {
            var placeModel = await _context.PlaceModels.FindAsync(id);

            if (placeModel == null)
            {
                return NotFound();
            }

            return placeModel;
        }

        // PUT: api/PlaceModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPlaceModel(int id, PlaceModel placeModel)
        {
            if (id != placeModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(placeModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PlaceModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            await _context.PlaceModels.ToListAsync();

            return Ok(await _context.TravelDetails.Include(place => place.Places).ToListAsync());
        }

        // POST: api/PlaceModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PlaceModel>> PostPlaceModel(PlaceModel placeModel)
        {
            _context.PlaceModels.Add(placeModel);
            await _context.SaveChangesAsync();
            await _context.PlaceModels.ToListAsync();

            return Ok(await _context.TravelDetails.Include(place => place.Places).ToListAsync());
        }

        // DELETE: api/PlaceModels/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePlaceModel(int id)
        {
            var placeModel = await _context.PlaceModels.FindAsync(id);
            if (placeModel == null)
            {
                return NotFound();
            }

            _context.PlaceModels.Remove(placeModel);
            await _context.SaveChangesAsync();
            await _context.PlaceModels.ToListAsync();
            

            return Ok(await _context.TravelDetails.Include(place => place.Places).ToListAsync());
        }

        private bool PlaceModelExists(int id)
        {
            return _context.PlaceModels.Any(e => e.Id == id);
        }
    }
}
