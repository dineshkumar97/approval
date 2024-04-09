using Microsoft.AspNetCore.Mvc;


namespace ApprovalProcess.Controllers;
[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
     private readonly StoredProcedureExecutorService _StoredProcedureExecutorService;
     private readonly string connectionString;  
   
    public EmployeeController(IConfiguration configuration)
    {
        connectionString = configuration.GetConnectionString("DB_Dev");
        _StoredProcedureExecutorService = new StoredProcedureExecutorService(connectionString);
    }

    [HttpGet("EmployeeByUserID")]
    public IActionResult GetData(int userid)
    {
        try{       
        
        var parameters = new Dictionary<string, object>
        {
            
            { "@userid", userid }
            // Add other parameters as needed
        };
        // Execute the stored procedure and dynamically assign the result to models
        var results = _StoredProcedureExecutorService.ExecuteStoredProcedure("getEmployeesByUser",parameters,typeof(Employee), typeof(Department));
            

        // Accessing the results
        List<Employee> employee = MapResultSet<Employee>(results[0]);
        List<Department> department = MapResultSet<Department>(results[1]);
        if (employee.Count == 0 && department.Count == 0)
        {
            return NotFound("No employee,department found.");
        }
         return Ok(new { FirstResult = employee, SecondResult = department });
        }
        catch (Exception ex)
        {
                return StatusCode(500, $"Internal server error: {ex.Message}");
        }
      
       
    }

     private List<T> MapResultSet<T>(List<object> resultSet)
        {
            List<T> resultList = new List<T>();
            foreach (var item in resultSet)
            {
                resultList.Add((T)item);
            }
            return resultList;
        }

       
}