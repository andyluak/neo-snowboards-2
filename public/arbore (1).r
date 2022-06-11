library(rsample)
library(tidyverse) #necesar pentru geoplot
library(dplyr)
library(rpart) # necesar pentru CART Decision Trees
library(rpart.plot)
library(caret)
library(ipred)


Costuri <- read_csv("HospitalCosts.csv") #importam setul de date

#vizualizarea atributelor numerice
Costuri %>%
  select_if(is.numeric) %>%
  gather(metric, value) %>%
  ggplot(aes(value, fill=metric))+
  geom_density(show.legend=FALSE)+ #distributie statistica a valorilor numerice
  facet_wrap(~metric, scales= "free")

set.seed(111) #stabilizam rezultatele cautarii aleatoare
Costuri <- read_csv("HospitalCosts.csv") #importam setul de date
head(Costuri)
tail(Costuri)

costuri_split <- initial_split(Costuri, prop = 0.7) #impartim setul in urmatoarele proportii 70-30
costuri_train <- training(costuri_split) #costuri_train va fi setul de antrenament
costuri_test <- testing(costuri_split)   #costuri_test va fi setul de test

costuri_train %>% #afisam distributia costului de spitalizare din setul de antrenament
  ggplot(aes(price)) +
  geom_density()

#aplicam metoda rpart
#algoritm pentru crearea arborelui de antrenament
m1 <- rpart(                       
  formula = price ~ ., #atributul tinta in comparatie cu restul variabilelor
  data = costuri_train,
  method = "anova"
)                     
m1 # afisarea arborelui rezultat (in mod text)
rpart.plot(m1) #afisarea grafica a arborelui rezultat
plotcp(m1)  #afisare grafic referitor la alpha si T, astfel incat SSE sa fie minim

m1$cptable  # afisarea parametrilor alpha
printcp(m1)

m2 <- rpart(
  formula = price ~ ., 
  data = costuri_train,
  method = "anova",
  control = list(cp = 0, xval = 10)  # se creste arborele pana la obtinerea valorii zero pentru parametrul alpha
)# m2 este un arbore ne-taiat
m2 # afisarea arborelui rezultat (in mod text)
rpart.plot(m2)
plotcp(m2)
m2$cptable
printcp(m2)

#cautam cele mai bune valori pentru parametri minsplit si maxdepth
hyper_grid <- expand.grid(
  minsplit = seq(10, 50, 1), #intervalul pentru instante
  maxdepth = seq(2, 5, 1) #intervalul pentru adancime
)

#crearea modelelor de arbori
head(hyper_grid)
models <- list()
for (i in 1:nrow(hyper_grid)) {
  minsplit <- hyper_grid$minsplit[i]
  maxdepth <- hyper_grid$maxdepth[i]
  models[[i]] <- rpart(
    formula = price ~. ,
    data = costuri_train,
    method = "anova",
    control = list(minsplit = minsplit, maxdepth = maxdepth)
  )
}

#functie prin care obtinem paramentrul complexity minim din modelele create
get_cp <- function(x) {
  min <- which.min(x$cptable[,"xerror"])
  cp <- x$cptable[min, "CP"]
}

#functie prin care obtinem eroarea minima corespunzatoarea parametrului complexity minim
get_min_error <- function(x) {
  min <- which.min(x$cptable[, "xerror"])
  xerror <- x$cptable[min, "xerror"]
}
#adugam in dreptul fiecarui model parametrul cp si eroarea
mutated_grid <- hyper_grid %>%
  mutate(
    cp = purrr::map_dbl(models, get_cp),
    error = purrr::map_dbl(models, get_min_error)
  ) 

view(mutated_grid)

#afisam primele cinci modele cu eroarea cea mai mica
mutated_grid %>%
  arrange(error) %>%
  top_n(-5, wt=error)

#realizam arborele optim pe baza modelului cu cea mai mica eroare
optimal_tree <- rpart(
  formula = price ~ .,
  data = costuri_train,
  method = "anova",
  control = list(minsplit = 6, maxdepth = 6, cp = 0.04134061)
)
optimal_tree
rpart.plot(optimal_tree)

#efectuam o predictie si afisam eroarea pe setul de test
pred <- predict(m2, newdata = costuri_test)
RMSE(pred = pred, obs = costuri_test$price)
optimal_tree


#bagging

#BAGGING
library(ipred)
set.seed(123)

bagged_m1 <- bagging(
  formula = price ~ .,
  data = costuri_train, 
  coob = TRUE
)
bagged_m1

pred <- predict(bagged_m1, newdata = costuri_test)
RMSE(pred = pred, obs = costuri_test$price)


#assess 10-50 bagged trees
ntree <- 10:50
rmse <- vector(mode = "numeric", length = length(ntree))
for (i in seq_along(ntree)) {
  set.seed(123)
  model <- bagging(
    formula = price ~ .,
    data = costuri_train,
    coob = TRUE,
    nbagg = ntree[i]
  )
  rmse[i] = model$err
}
plot(ntree, rmse, type ="l", lwd=2)
abline(v=29, col = "red", lty="dashed")

bagged_best <- bagging(
  formula = price ~ .,
  data = costuri_train, 
  coob = TRUE,
  nbagg = 52,
  ns = 2200
)

pred <- predict(bagged_best, newdata = costuri_test)
RMSE(pred = pred, obs = costuri_test$price)


#Bagging with CARET
fitControl <- trainControl(
  method = "cv", #metoda de invatare este crros-validation de 10
  number = 10
)
bagged_cv <- train(
  price ~.,
  data = costuri_train,
  method = "treebag",
  trControl = fitControl,
  importance = TRUE,
  na.action = na.pass
)
bagged_cv
plot(varImp(bagged_cv), 20)

pred <- predict(bagged_cv, costuri_test)
RMSE(pred, costuri_test$price)

for_plotting <- tibble(
  i = 1:150,
  pred = pred[],
  actual = costuri_test$price
)

ggplot(for_plotting, aes(x=i)) +
  geom_point(aes(y = pred, color = "red")) +
  geom_point(aes(y = actual, color = "blue"))

ggplot(for_plotting, aes(x=i)) + 
  geom_point(aes(y = pred-actual))

## Random Forests
set.seed(111)
library(randomForest)
m1_rf <- randomForest(
  formula = price ~ .,
  data = costuri_train,
  na.action = na.pass
)
m1_rf
plot(m1_rf)
m1_rf$mse
which.min(m1_rf$mse)
sqrt(m1_rf$mse[which.min(m1_rf$mse)])

