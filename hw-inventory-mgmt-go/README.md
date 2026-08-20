# HW: Inventory Manager

Write a program to manage the inventory in a warehouse.
As an additional challenge, try to increase productivity by helping the picker-bots to pick items in a more efficient order.


## Requirements

Your program must have certain types and functions with specific names and signatures.
You may define other types and functions to help you.


### Types

#### type Location

```go
type Location struct {
	Aisle int
	Bay   int
	Bin   int
}
```

`Location` is the 3-dimensional address of an item in a warehouse.
A warehouse contains aisles of bays of bins of items.
Aisles, bays, and bins are numbered starting at 1.
Picker-bots in the warehouse must navigate to an item's location to retrieve it for order fulfillment.
The special value `Location{0, 0, 0}` is the receiving bay where items are delivered to the warehouse.
Items cannot be picked for order fulfillment until they are moved from the receiving bay to another location in the warehouse.


#### type Item

```go
type Item struct {
	Sku      string
	Name     string
	Quantity int
	Location Location
}
```

`Item` is an item in a warehouse.
Items have a "stock-keeping unit" (SKU) that uniquely identifies the item, a name that describes the item, a quantity of items currently in inventory, and a location in the warehouse.


#### type Warehouse

```go
type Warehouse struct {
	Name      string
	Items     map[string]*Item
    NumAisles int
    NumBays   int
    NumBins   int
}
```

`Warehouse` is a building that has a name and many items arranged in aisles, bays, and bins.
Picker-bots move through the warehouse selecting and retrieving items for order fulfillment.


### Functions

Many of these functions will possibly return an `error`. We haven't specified what those errors are because we want *you* to think about what would be an error condition. Be thorough as the test cases will check for the use of errors.

#### func NewItem

```go
func NewItem(sku, name string, quantity int) (*Item, error)
```

`NewItem` returns a pointer to an `Item` with the given SKU, name, and quantity and an initial location of {0, 0, 0} (i.e. the receiving bay).


#### func NewWarehouse

```go
func NewWarehouse(name string, aisles, bays, bins int) (*Warehouse, error)
```

`NewWarehouse` returns a pointer to a `Warehouse` with the given name, number of aisles, bays per aisle and bins per bay, and an empty inventory.


#### func LoadWarehouse

```go
func LoadWarehouse(filename string) (*Warehouse, error)
```

`LoadWarehouse` loads a warehouse and its inventory from a file in JSON format.


#### func SaveWarehouse

```go
func SaveWarehouse(w *Warehouse, filename string) error
```

`SaveWarehouse` saves a warehouse and its inventory to a file in JSON format.


#### func Add

```go
func (w *Warehouse) Add(sku, name string, quantity int) error
```

`Add` adds a new item to the warehouse inventory.
New items are initially stored at the receiving bay.


#### func Find

```go
func (w *Warehouse) Find(sku string) (*Item, error)
```

`Find` returns a pointer to the item in the inventory with the given SKU.


#### func Move

```go
func (w *Warehouse) Move(sku string, newLocation Location) error
```

`Move` updates the location of an item given the SKU and new location.
A picker-bot is dispatched to find and move the item.


#### func LowStock

```go
func (w *Warehouse) LowStock(amount int) []*Item
```

`LowStock` returns a slice of pointers to items that have quantity strictly less than the given amount.


#### func Restock

```go
func (w *Warehouse) Restock(sku string, quantity int) error
```

`Restock` increases the quantity of an item in the inventory.
A picker-bot is dispatched to add the new stock to the item's bin.


#### func Pick

```go
func (w *Warehouse) Pick(sku string, quantity int) error
```

`Pick` removes a number of items from the inventory.
A picker-bot is dispatched to retreive the items.


#### func Discontinue

```go
func (w *Warehouse) Discontinue(sku string)
```

`Discontinue` removes all units of an item from the inventory.
A picker-bot is dispatched to collect and dispose of the discontinued item.


#### func FindShorterPath

```go
func (w *Warehouse) FindShorterPath(skus []string, distance func(a, b Location) float64) ([]string, error)
```

`FindShorterPath` finds a path (ordering of item SKUs) that is shorter (with respect to the provided distance function) than the original (input) order, if possible.
The picker-bot starts and ends at the receiving bay: `Location{0, 0, 0}`.

[More information about functions as arguments.](functions-as-args.md)


### Example

Given `warehouse.json` contains:

```json
{
    "Name": "Gopher Books",
    "NumAisles": 8,
    "NumBays": 6,
    "NumBins": 7,
    "Items": [
        {
            "Sku": "GoPL",
            "Name": "The Go Programming Language",
            "Quantity": 5,
            "Location": {
                "Aisle": 3,
                "Bay": 1,
                "Bin": 2
            }
        }
    ]
}
```

When I run the code:

```go
w, _ := LoadWarehouse("warehouse.json")
item := w.Find("GoPL")
fmt.Printf("item is %v\n", item)
w.Pick("GoPL", 2)
w.Move("GoPL", Location{2, 2, 1})
fmt.Printf("item is %v\n", item)
```

Then I should see:

```txt
item is &{GoPL The Go Programming Language 5 {3 1 2}}
item is &{GoPL The Go Programming Language 3 {2 2 1}}
```


### Testing

You must write tests that cover at least 90% of the statements in your program.


## Submission

Submit only these files to Gradescope:

* `inventory_manager.go`
* `inventory_manager_test.go`
