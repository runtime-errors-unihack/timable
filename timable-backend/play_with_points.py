from shapely.geometry import Point
from shapely.geometry.polygon import Polygon

point = Point(0,0)
polygon = Polygon([(45.7648342, 21.1075530), (45.7654873, 21.1153327), (45.7617229, 21.1159546), (45.7610953, 21.1081981)])
print(polygon.contains(point))