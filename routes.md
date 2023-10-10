POST
http://172.16.28.15:5000/createTransaction
{
    "trans_type": 1,
    "subtrans_type": 1,
    "driver_id": 2,
    "supplier_id": 1005,
    "item_id":6,
    "quantity": 100,
    "plate_no": "TEST_123"
}
http://172.16.28.15:5000/addSupplier
{
    "firstname":"item",
    "lastname":"lastname",
    "address":"address"
}
http://172.16.28.15:5000/addDriver
{
    "firstname":"item",
    "lastname":"lastname"
}
http://172.16.28.15:5000/addItem
{
    "item_name":"item",
    "uom":"lastname"
}
http://172.16.28.15:5000/addOutboundWeight
{
    "weight": 5124,
    "user_id": 1,
    "transId": 6
}
http://172.16.28.15:5000/addInboundWeight
{
    "weight": 5124,
    "user_id": 1,
    "transId": 6
}
PUT
http://172.16.28.15:5000/updateSupplier/1
{
    "firstname":"item",
    "lastname":"lastname",
    "address":"address"
}
http://172.16.28.15:5000/updateDriver/1
{
    "firstname":"item",
    "lastname":"lastname"
}
http://172.16.28.15:5000/updateItem/1
{
    "item_name":"item",
    "uom":"lastname"
}
http://172.16.28.15:5000/updateOutbound/1
{
    "weight": 5124,
    "user_id": 1,
    "transId": 6
}
http://172.16.28.15:5000/updateOutbound/1
{
    "weight": 5124,
    "user_id": 1,
    "transId": 6
}
http://172.16.28.15:5000/updateTransaction/1
{
    "trans_type": 1,
    "subtrans_type": 1,
    "driver_id": 2,
    "supplier_id": 1005,
    "item_id":6,
    "quantity": 100,
    "plate_no": "TEST_123"
}

POST
http://172.16.28.15:5000/addUser
{
    "f_name":"item",
    "l_name":"lastname",
    "employee_id": 12345,
    "e_password": "test",
    "e_pincode":4444
}
PUT/EDIT
http://172.16.28.15:5000/editUser/:id
{
    "f_name":"item",
    "l_name":"lastname",
    "employee_id": 12345,
    "e_password": "test",
    "e_pincode":4444
}

http://172.16.28.15:5000/login
{
    "e_employee":154151800,
    "passwords": "1234"
}

DELETE
http://172.16.28.15:5000/deleteSupplier/:id
http://172.16.28.15:5000/deleteItem/:id
http://172.16.28.15:5000/deleteDriver/:id
GET
http://172.16.28.15:5000/getSuppliers
http://172.16.28.15:5000/getItems
http://172.16.28.15:5000/getDrivers
http://172.16.28.15:5000/getUsers
http://172.16.28.15:5000/getTranstype
http://172.16.28.15:5000/getSubtransType