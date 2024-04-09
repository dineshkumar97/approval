using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ApprovalProcess;
using System.Reflection;

public class StoredProcedureExecutorService
{
    private readonly string _connectionString;

    public StoredProcedureExecutorService(string? connectionString)
    {
        this._connectionString = connectionString;
    }
   

    public List<List<object>> ExecuteStoredProcedure(string storedProcedureName,Dictionary<string, object> parameters, params Type[] modelTypes)
    {

    try{
        List<List<object>> results = new List<List<object>>();
        using (SqlConnection connection = new SqlConnection(_connectionString))
        {
            using (SqlCommand command = new SqlCommand(storedProcedureName, connection))
            {
                command.CommandType = CommandType.StoredProcedure;
                 if(parameters !=null)
                        {
                             foreach (var param in parameters)
                            {
                                    command.Parameters.AddWithValue(param.Key,param.Value);
                            }
                        }

                connection.Open();

                using (SqlDataReader reader = command.ExecuteReader())
                {
                    int resultSetIndex = 0;
                    do
                    {
                        Type modelType = modelTypes[resultSetIndex];
                        PropertyInfo[] properties = modelType.GetProperties();
                        List<object> result = new List<object>();

                        while (reader.Read())
                        {
                            object model = Activator.CreateInstance(modelType);
                            for (int i = 0; i < reader.FieldCount; i++)
                            {
                                string columnName = reader.GetName(i);
                                PropertyInfo property = Array.Find(properties, p => p.Name == columnName);
                                if (property != null && !reader.IsDBNull(i))
                                {
                                    property.SetValue(model, reader.GetValue(i));
                                }
                            }
                            result.Add(model);
                        }
                        results.Add(result);
                        resultSetIndex++;
                    }
                    while (reader.NextResult());
                }
            }
        }
        return results;
    }
        catch (SqlException ex)
    {
        // Log or handle the SQL exception
        throw new Exception("Error executing stored procedure", ex);
    }
    catch (Exception ex)
    {
        // Handle other exceptions
        throw new Exception("An error occurred", ex);
    }

        
    }

      
    }
