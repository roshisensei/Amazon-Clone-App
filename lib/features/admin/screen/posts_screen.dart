import 'package:amazon_app/common/widgets/loader.dart';
import 'package:amazon_app/features/account/widgets/single_product.dart';
import 'package:amazon_app/features/admin/screen/add_product_screen.dart';
import 'package:amazon_app/features/admin/services/admin_services.dart';
import 'package:amazon_app/models/product.dart';
import 'package:amazon_app/utils.dart';
import 'package:flutter/material.dart';

class PostsScreen extends StatefulWidget {
  const PostsScreen({super.key});

  @override
  State<PostsScreen> createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  AdminServices adminServices = AdminServices();
  List<Product>? productList;

  void navigateToAddProduct() async {
    await Navigator.pushNamed(context, AddProductScreen.routeName);
    setState(() {
      fetchAllProduct();
    });
  }

  @override
  void initState() {
    super.initState();
    fetchAllProduct();
  }

  void fetchAllProduct() async {
    productList = await adminServices.fetchAllProduct(context);
    setState(() {});
  }

  void deleteProduct(Product product, int index) {
    adminServices.deleteProduct(
      context: context,
      product: product,
      onSuccess: () {
        productList!.removeAt(index);
        setState(() {});
        showSnackBar(context: context, text: 'deleted successfully!');
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return productList == null
        ? const Loader()
        : Scaffold(
            body: GridView.builder(
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2),
              itemCount: productList!.length,
              itemBuilder: (context, index) {
                final productData = productList![index];
                return Column(
                  children: [
                    SizedBox(
                      height: 130,
                      child: SingleProduct(image: productData.images[0]),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(
                          child: Text(
                            productData.name,
                            overflow: TextOverflow.ellipsis,
                            maxLines: 2,
                          ),
                        ),
                        IconButton(
                          onPressed: () => deleteProduct(productData, index),
                          icon: const Icon(Icons.delete_outlined),
                        ),
                      ],
                    ),
                  ],
                );
              },
            ),
            floatingActionButton: FloatingActionButton(
              onPressed: navigateToAddProduct,
              tooltip: 'Add a Product',
              child: const Icon(Icons.add),
            ),
            floatingActionButtonLocation:
                FloatingActionButtonLocation.centerFloat,
          );
  }
}
